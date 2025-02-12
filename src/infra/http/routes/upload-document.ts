import { uploadDocument } from '@/app/functions/upload-document'
import { isRight } from '@/shared/either'
import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadDocumentRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an document',
        consumes: ['multipart/form-data'],
        tags: ['Uploads'],
        response: {
          201: z.null().describe('Document uploaded'),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file()

      if (!uploadedFile) {
        return reply.status(400).send({ message: 'File is required.' })
      }

      const result = await uploadDocument({
        fileName: uploadedFile.filename,
        contentStream: uploadedFile.file,
        contentType: uploadedFile.mimetype,
      })

      if (isRight(result)) {
        return reply.status(201).send()
      }
    }
  )
}
