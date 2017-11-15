var XmlParse = require('../src')

function fixture () {
  return '<service>test</service><item id="1">first</item><item id="2">second</item><user role="developer"><name>djf</name></user>'
}

module.exports.example = function (test) {
  var xml = XmlParse(fixture())

  // by tag
  console.log(xml.tagValue('service')) // test

  // by tag and attribute
  console.log(xml.tagValue('user', 'role')) // developer

  // by nested tags
  console.log(xml.tagValue('user').tagValue('name')) // djf

  // by array of tags, matiching the first tag found
  console.log(xml.tagValue(['not', 'service'])) // test

  // group of tags
  var itens = xml.tagGroup('item')
  console.log(itens) // ["<item id=\"1\">first</item>", "<item id=\"2\">second</item>"]
  console.log(xml.tagValue('item', 'id')) // 1

  test.done()
}

module.exports.tagValue = function (test) {
  var xml = XmlParse(fixture())

  test.equal(xml.tagValue('service'), 'test')

  test.equal(xml.tagValue(['service']), 'test')

  test.equal(xml.tagValue(['not', 'service']), 'test')

  test.equal(xml.tagValue('user', 'role'), 'developer')

  test.equal(typeof xml.tagValue('user'), 'object')

  test.done()
}

module.exports.invalidTagValue = function (test) {
  var xml = XmlParse(fixture())

  test.equal(xml.tagValue(), null)

  test.equal(xml.tagValue(''), null)

  test.equal(xml.tagValue(null), null)

  test.done()
}

module.exports.tagGroup = function (test) {
  var xml = XmlParse(fixture())

  var itens = xml.tagGroup('item')

  test.equal(itens.length, 2)

  test.done()
}

module.exports.invalidTagGroup = function (test) {
  var xml = XmlParse(fixture())

  test.equal(xml.tagGroup('notfound').length, 0)

  test.equal(xml.tagGroup().length, 0)

  test.equal(xml.tagGroup('').length, 0)

  test.equal(xml.tagGroup(null).length, 0)

  test.done()
}
