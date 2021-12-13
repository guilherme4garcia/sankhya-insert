const sankhyaApiHelper = require('./helpers/sankhyaApi')
const { getQuery } = require('./getdata')
const fs = require('fs')

function table(entity, column, field) {
  let result = []
  for (let i = 0; i < column.length; i++) {
    if (i < field.length) {
      let table = `                   <${column[i]}>${field[i]}</${column[i]}>\n`
      result.push(table)
    } else {
      let table = `                   <${column[i]}></${column[i]}>\n`
      result.push(table)
    }
  }

  const insert = result.join('')
  let xml = `<serviceRequest serviceName="CRUDServiceProvider.saveRecord">
      <requestBody>
        <dataSet rootEntity="${entity}">
            <entity path="">
                <fieldset list="*"/>
            </entity>
            <dataRow>
                <localFields>
${insert}                </localFields>
            </dataRow>
        </dataSet>
     </requestBody>
</serviceRequest>`

  return xml
}

async function xml(login, password, entity, fields) {
  try {
    getQuery(
      login,
      password,
      `SELECT NOMECAMPO FROM TDDCAM WHERE NOMETAB = '${entity}' ORDER BY ORDEM`
    )
      .then(data => table(entity, data, fields))
      .then(xml => {
        sankhyaApiHelper.post(
          '/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
          xml
        )

        console.log(xml)
        fs.writeFile('xml.xml', xml, err => {
          if (err) {
            console.log(err)
          }
        })
      })
  } catch (error) {
    return console.log(error)
  }
}
