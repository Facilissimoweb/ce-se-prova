import React from 'react';

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-[#F4F1EA]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export function FormattedDispensaBody({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n');
  return (
    <div className="space-y-3 text-sm md:text-[15px] leading-relaxed text-[#E8e1dd]">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) return <div key={idx} className="h-1" aria-hidden="true" />;
        if (line.startsWith('## ')) {
          return (
            <h4
              key={idx}
              className="font-display text-lg md:text-xl text-[#D4AF37] pt-3 first:pt-0"
            >
              {line.slice(3)}
            </h4>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h5
              key={idx}
              className="font-body font-semibold text-base text-[#F4F1EA] pt-2"
            >
              {line.slice(4)}
            </h5>
          );
        }
        if (line.startsWith('#### ')) {
          return (
            <h6
              key={idx}
              className="font-body font-semibold text-sm text-[#E6C65C] pt-2"
            >
              {line.slice(5)}
            </h6>
          );
        }
        if (line.startsWith('- ') || /^\d+\.\s/.test(line)) {
          const clean = line.startsWith('- ')
            ? line.slice(2)
            : line.replace(/^\d+\.\s/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2">
              <span
                className="text-[#D4AF37] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0"
                aria-hidden="true"
              />
              <p>{renderInlineBold(clean)}</p>
            </div>
          );
        }
        return <p key={idx}>{renderInlineBold(line)}</p>;
      })}
    </div>
  );
}
