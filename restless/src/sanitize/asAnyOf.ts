import { Either, Sanitizer, Schema } from './sanitizer'

type NonEmptyArray<T> = [T, ...T[]]

interface AsAnyOf {
  <A> (sanitizers: Schema<[A]>, expected: string): Sanitizer<A>
  <A, B> (sanitizers: Schema<[A, B]>, expected: string): Sanitizer<A | B>
  <A, B, C> (sanitizers: Schema<[A, B, C]>, expected: string): Sanitizer<A | B | C>
  <A, B, C, D> (sanitizers: Schema<[A, B, C, D]>, expected: string): Sanitizer<A | B | C | D>

  (sanitizers: NonEmptyArray<Sanitizer<any>>, expected: string): Sanitizer<any>
}

export const asAnyOf: AsAnyOf = (
  sanitizers: Array<Sanitizer<any>>,
  expected: string
): Sanitizer<any> =>
  (value, path) => {
    if (sanitizers.length === 0) {
      return Either.right(value)
    }
    for (const sanitizer of sanitizers) {
      const result = sanitizer(value, path)
      if (Either.isRight(result)) {
        return result
      }
    }
    return Either.left([{ path, expected }])
  }
