djf-xml
========

Simple javascript xml parser.


Installation
------------
    npm install djf-xml


Usage
-----
    var XmlParse = require('djf-xml')
    function fixture () {
        return '<service>test</service><item id="1">first</item><item id="2">second</item><user role="developer"><name>djf</name></user>'
    }

    var xml = XmlParse(fixture())
    console.log(xml.tagValue('service')) // test

    console.log(xml.tagValue('user', 'role')) // developer
    console.log(xml.tagValue('user').tagValue('name')) // djf

    var itens = xml.tagGroup('item')
    console.log(itens) // ["<item id=\"1\">first</item>", "<item id=\"2\">second</item>"]
    console.log(xml.tagValue('item', 'id')) // 1


API Documentation
-----------------

* __tagValue(tag, [attribute])__ - Return tag/attribute value or new Object.
* __tagGroup(tag)__ - Return array of tags.
