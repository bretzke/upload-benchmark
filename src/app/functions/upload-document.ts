import { Readable } from 'node:stream'
import { type Either, makeRight } from '@/shared/either'
import { z } from 'zod'

const uploadDocumentInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadDocumentInput = z.input<typeof uploadDocumentInput>

export async function uploadDocument(
  input: UploadDocumentInput
): Promise<Either<Error, { url: string }>> {
  return makeRight({ url: `http://test.com/${JSON.stringify(input)}` })
}
