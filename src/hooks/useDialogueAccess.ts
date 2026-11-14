import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { DialogueAccessStatus, DialoguePackId } from '../types/handoff';
import { dialogueTimePacks } from '../data/siteContent';
import { getOrCreateDialogueSessionKey, nowTimeLabel } from '../lib/dialogueSession';
import { isValidEmail, isValidFullName } from '../lib/formValidation';
import type { ChatMessage } from '../types/handoff';

type GetIdToken = () => Promise<string | null>;

interface UseDialogueAccessParams {
  userUid: string | undefined;
  getIdToken: GetIdToken;
  onPassActivated?: (message: ChatMessage) => void;
}

export function useDialogueAccess({
  userUid,
  getIdToken,
  onPassActivated,
}: UseDialogueAccessParams) {
  const [sessionKey] = useState<string>(() => getOrCreateDialogueSessionKey());

  const [accessStatus, setAccessStatus] = useState<DialogueAccessStatus>({
    sessionKey,
    mode: 'ready',
    remainingSeconds: 300,
    freeTrialSecondsTotal: 300,
    freeTrialUsed: false,
    activePackId: null,
    expiresAtIso: null,
    interactionsCount: 0,
    serverTimeIso: new Date().toISOString(),
  });
  const [serverOffsetMs, setServerOffsetMs] = useState(0);
  const [liveRemainingSeconds, setLiveRemainingSeconds] = useState(300);
  const [showPassPanel, setShowPassPanel] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState<DialoguePackId>('10m');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const applyServerStatus = useCallback((nextStatus: DialogueAccessStatus) => {
    const serverNow = Date.parse(nextStatus.serverTimeIso);
    if (!Number.isNaN(serverNow)) {
      setServerOffsetMs(serverNow - Date.now());
    }
    setAccessStatus(nextStatus);
    setLiveRemainingSeconds(nextStatus.remainingSeconds);
    if (nextStatus.mode === 'expired') {
      setShowPassPanel(true);
    }
  }, []);

  const fetchDialogueStatus = useCallback(async () => {
    try {
      const token = userUid ? await getIdToken() : null;
      const res = await fetch(
        `/api/dialogue/status?sessionKey=${encodeURIComponent(sessionKey)}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      if (!res.ok) return;
      const json = (await res.json()) as { status?: DialogueAccessStatus };
      if (json.status) {
        applyServerStatus(json.status);
      }
    } catch {
      // Keep graceful local state if transient network error
    }
  }, [sessionKey, userUid, getIdToken, applyServerStatus]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stripeSessionId = params.get('dialogue_stripe_session_id');
    if (stripeSessionId) {
      (async () => {
        try {
          const token = userUid ? await getIdToken() : null;
          const res = await fetch('/api/dialogue/confirm-stripe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ stripeSessionId, sessionKey }),
          });
          const json = (await res.json()) as { status?: DialogueAccessStatus };
          if (res.ok && json.status) {
            applyServerStatus(json.status);
            setShowPassPanel(false);
            onPassActivated?.({
              id: `stripe-ok-${Date.now()}`,
              sender: 'practitioner',
              authorName: 'Tarot Italia IA · Pass Attivato',
              timestamp: nowTimeLabel(),
              text: 'Pagamento confermato. Il tuo pass temporale è attivo: puoi proseguire il dialogo con gli Arcani Maggiori.',
            });
          }
        } finally {
          window.history.replaceState({}, '', window.location.pathname);
        }
      })();
    } else {
      fetchDialogueStatus();
    }
  }, [
    fetchDialogueStatus,
    applyServerStatus,
    getIdToken,
    sessionKey,
    userUid,
    onPassActivated,
  ]);

  useEffect(() => {
    if (
      (accessStatus.mode !== 'free_trial' && accessStatus.mode !== 'paid_pass') ||
      !accessStatus.expiresAtIso
    ) {
      return;
    }

    const expiryMs = Date.parse(accessStatus.expiresAtIso);
    if (Number.isNaN(expiryMs)) return;

    const updateTick = () => {
      const estimatedServerNow = Date.now() + serverOffsetMs;
      const secs = Math.max(0, Math.ceil((expiryMs - estimatedServerNow) / 1000));
      setLiveRemainingSeconds(secs);
      if (secs <= 0) {
        setAccessStatus((prev) => ({
          ...prev,
          mode: 'expired',
          remainingSeconds: 0,
        }));
        setShowPassPanel(true);
      }
    };

    updateTick();
    const timer = window.setInterval(updateTick, 1000);
    return () => window.clearInterval(timer);
  }, [accessStatus.mode, accessStatus.expiresAtIso, serverOffsetMs]);

  const authorizeInteraction = useCallback(async (): Promise<boolean> => {
    if (
      accessStatus.mode === 'expired' ||
      (liveRemainingSeconds <= 0 && accessStatus.mode !== 'ready')
    ) {
      setShowPassPanel(true);
      return false;
    }

    try {
      const token = userUid ? await getIdToken() : null;
      const res = await fetch('/api/dialogue/interact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ sessionKey }),
      });
      const json = (await res.json()) as {
        allowed?: boolean;
        status?: DialogueAccessStatus;
      };
      if (json.status) {
        applyServerStatus(json.status);
      }
      if (res.status === 402 || json.allowed === false) {
        setShowPassPanel(true);
        return false;
      }
      return true;
    } catch {
      return accessStatus.mode === 'ready' || liveRemainingSeconds > 0;
    }
  }, [
    accessStatus.mode,
    liveRemainingSeconds,
    userUid,
    getIdToken,
    sessionKey,
    applyServerStatus,
  ]);

  const selectedPack =
    dialogueTimePacks.find((p) => p.id === selectedPackId) ?? dialogueTimePacks[1];

  const handleUnlockTimePack = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setUnlockError(null);

      if (!isValidFullName(customerName)) {
        setUnlockError('Inserisci il tuo nome e cognome.');
        return;
      }
      if (!isValidEmail(customerEmail)) {
        setUnlockError('Inserisci un indirizzo email valido.');
        return;
      }

      setUnlocking(true);
      try {
        const token = userUid ? await getIdToken() : null;
        const res = await fetch('/api/dialogue/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            sessionKey,
            packId: selectedPack.id,
            customerName: customerName.trim(),
            customerEmail: customerEmail.trim(),
          }),
        });
        const json = (await res.json()) as {
          error?: string;
          mode?: 'stripe_redirect' | 'direct_unlock';
          checkoutUrl?: string;
          status?: DialogueAccessStatus;
        };
        if (!res.ok) {
          throw new Error(json.error || 'Impossibile attivare il pass temporale.');
        }

        if (json.mode === 'stripe_redirect' && json.checkoutUrl) {
          window.location.assign(json.checkoutUrl);
          return;
        }

        if (json.status) {
          applyServerStatus(json.status);
        }

        setShowPassPanel(false);
        onPassActivated?.({
          id: `unlock-${Date.now()}`,
          sender: 'practitioner',
          authorName: 'Tarot Italia IA · Pass Attivato',
          timestamp: nowTimeLabel(),
          text: `${selectedPack.title} attivato (${selectedPack.durationMinutes} minuti · € ${selectedPack.priceEur}). Puoi proseguire il dialogo con gli Arcani Maggiori.`,
        });
      } catch (err) {
        setUnlockError(
          err instanceof Error ? err.message : 'Errore durante l’attivazione.'
        );
      } finally {
        setUnlocking(false);
      }
    },
    [
      customerName,
      customerEmail,
      userUid,
      getIdToken,
      sessionKey,
      selectedPack,
      applyServerStatus,
      onPassActivated,
    ]
  );

  const isExpired = accessStatus.mode === 'expired';
  const totalWindowSeconds =
    accessStatus.mode === 'paid_pass'
      ? Math.max(
          liveRemainingSeconds,
          (dialogueTimePacks.find((p) => p.id === accessStatus.activePackId)
            ?.durationMinutes ?? 5) * 60
        )
      : accessStatus.freeTrialSecondsTotal;
  const progressRatio = Math.min(
    1,
    Math.max(0, liveRemainingSeconds / Math.max(1, totalWindowSeconds))
  );

  return {
    sessionKey,
    accessStatus,
    liveRemainingSeconds,
    showPassPanel,
    setShowPassPanel,
    selectedPackId,
    setSelectedPackId,
    selectedPack,
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    unlocking,
    unlockError,
    authorizeInteraction,
    handleUnlockTimePack,
    isExpired,
    progressRatio,
  };
}
