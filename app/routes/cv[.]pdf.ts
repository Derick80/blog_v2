import { renderToStream } from '@react-pdf/renderer'
import { json } from '@remix-run/node'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import PDF from '~/components/shared/pdf'
export async function loader({ request }: { request: Request }) {
    const user = await isAuthenticated(request)

    if (!user) {
      return json({ error: 'Not authenticated' }, { status: 401 })
    }
    let cv = await prisma.curriculumVitae.findMany({
      where: {
        userId: user.id
      },
      include: {
        education: true,
        cvExperiences: true,
        skills: true,
        publications: true
      }
    })
    let stream = await renderToStream(cv)
    let body: Buffer = await new Promise((resolve, reject) => {
    let buffers: Uint8Array[] = [];
    stream.on("data", (data) => {
      buffers.push(data);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    stream.on("error", reject);
  });

  let headers = new Headers({ "Content-Type": "application/pdf" });
  return new Response(body, { status: 200, headers });  }