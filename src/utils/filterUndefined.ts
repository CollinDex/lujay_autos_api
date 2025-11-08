import { HttpError } from "../middleware";


export function filterUndefined<T extends object>(obj: T): Partial<T> {
    const filtered = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    ) as Partial<T>;

    if (Object.keys(filtered).length === 0) {
        throw new HttpError(400, "No fields provided to update");
    }

    return filtered;
}
