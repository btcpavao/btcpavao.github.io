// Deliberately separate from the deployed entry point. No email binding, logs,
// persistence or network Siteverify calls: use only synthetic local questions.
import { createAskPavaoHandler } from "./index"
const handler = createAskPavaoHandler({
  local: true,
  siteverify: async (_url, options) => {
    const { response } = JSON.parse(String(options?.body))
    return Response.json({
      success: response === "XXXX.DUMMY.TOKEN.XXXX",
      hostname: "127.0.0.1",
      action: "ask_pavao",
    })
  },
  deliver: async () => {},
})
export default { fetch: handler } satisfies ExportedHandler<AskPavaoEnv>
