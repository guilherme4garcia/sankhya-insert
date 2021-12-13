const sankhyaApiHelper = require('./helpers/sankhyaApi')

async function getSession(login, password) {
  try {
    const bodyLogin = `<serviceRequest serviceName="MobileLoginSP.login"><requestBody><NOMUSU>${login}</NOMUSU><INTERNO>${password}</INTERNO></requestBody></serviceRequest>`
    const { data } = await sankhyaApiHelper.get(
      '/service.sbr?serviceName=MobileLoginSP.login',
      { data: bodyLogin }
    )
    const jsession = data.split('<jsessionid>')[1].split('</jsessionid>')[0]
    sankhyaApiHelper.defaults.headers.common.Cookie = `JSESSIONID=${jsession}`
  } catch (err) {
    console.log('ERROR ----', err)
  }
}

async function getQuery(login, password, sql) {
  await getSession(login, password)

  const body = {
    serviceName: 'DbExplorerSP.executeQuery',
    requestBody: {
      sql
    }
  }

  const { data } = await sankhyaApiHelper.get(
    '/service.sbr?serviceName=DbExplorerSP.executeQuery',
    {
      data: body,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  )

  const items = data.responseBody.rows
  return items
}

module.exports = { getSession, getQuery }
