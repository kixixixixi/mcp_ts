import { searchTrackByComposer } from "../jasrac.js"

const exec = async () => {
  const result = await searchTrackByComposer({
    composer: "keeno",
  })
  console.log(result)
  process.exit(0)
}

exec()
