export const getGithubData = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error(error)
  } finally {
    console.log('rodou getGithubData')
  }
}
