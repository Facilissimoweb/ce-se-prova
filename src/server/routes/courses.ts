import { getPublicCourseCatalog } from '../../db/repository.ts';
import { json, mapSafeError, type ApiResult } from '../http.ts';

export async function getCourses(): Promise<ApiResult> {
  try {
    const catalog = await getPublicCourseCatalog();
    return json(200, { courses: catalog });
  } catch (error) {
    return mapSafeError(
      error,
      'Errore nel caricamento dei percorsi didattici.'
    );
  }
}
