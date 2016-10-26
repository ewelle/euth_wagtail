var React = require('react')
var h = require('react-hyperscript')
var django = require('django')

var Paragraph = React.createClass({
  add: function () {
    this.props.addParagraphBeforeIndex(this.props.index)
  },
  delete: function () {
    this.props.deleteParagraph(this.props.index)
  },
  up: function () {
    this.props.moveParagraphUp(this.props.index)
  },
  down: function () {
    this.props.moveParagraphDown(this.props.index)
  },
  handleNameChange: function (e) {
    var index = this.props.index
    var text = e.target.value
    this.props.updateParagraphName(index, text)
  },
  ckEditorDestroy: function (id) {
    var editor = window.CKEDITOR.instances[id]
    editor.destroy()
  },
  ckEditorCreate: function (id) {
    var editor = window.CKEDITOR.replace(id, this.props.config)
    editor.on('change', function (e) {
      var text = e.editor.getData()
      var index = this.props.index
      this.props.updateParagraphText(index, text)
    }.bind(this))
    editor.setData(this.props.paragraph.text)
  },
  componentWillUpdate: function () {
    var id = 'id_paragraphs-' + this.props.id + '-text'
    this.ckEditorDestroy(id)
  },
  componentDidUpdate: function () {
    var id = 'id_paragraphs-' + this.props.id + '-text'
    this.ckEditorCreate(id)
  },
  componentDidMount: function () {
    var id = 'id_paragraphs-' + this.props.id + '-text'
    this.ckEditorCreate(id)
  },
  render: function () {
    var ckEditorToolbarsHeight = 60  // measured on example editor
    return (
      h('div', [
        h('div.row', [
          h('div.col-md-9', [
            h('button.btn.btn-hover-success.btn-block', {
              onClick: this.add,
              type: 'button'
            }, [
              h('i.fa.fa-plus')
            ])
          ])
        ]),
        h('section.row.commenting-paragraph', {
          id: 'paragraphs' + this.props.id
        }, [
          h('div.col-sm-9.paragraph', [
            h('div.form-group', [
              h('label', {
                htmlFor: 'id_paragraphs-' + this.props.id + '-name'
              }, django.gettext('Headline:')),
              h('input.form-control', {
                id: 'id_paragraphs-' + this.props.id + '-name',
                name: 'paragraphs-' + this.props.id + '-name',
                type: 'text',
                defaultValue: this.props.paragraph.name,
                onChange: this.handleNameChange
              }),
              this.props.errors && this.props.errors.name ? h('ul.errorlist', [
                h('li', this.props.errors.name[0])
              ]) : null,
              h('label', {
                htmlFor: 'id_paragraphs-' + this.props.id + '-text'
              }, django.gettext('Paragraph:')),
              h('div.django-ckeditor-widget', {
                'data-field-id': 'id_paragraphs-' + this.props.id + '-text',
                'style': {display: 'inline-block'}
              }, [
                h('textarea', {
                  id: 'id_paragraphs-' + this.props.id + '-text',
                  style: {'height': this.props.config.height + ckEditorToolbarsHeight}
                }),
                this.props.errors && this.props.errors.text ? h('ul.errorlist', [
                  h('li', this.props.errors.text[0])
                ]) : null
              ])
            ])
          ]),
          h('div.col-sm-3.comment-count', [
            h('div.action-bar', [
              h('button.btn.btn-hover-primary',
                this.props.moveParagraphUp
                ? {
                  onClick: this.up,
                  type: 'button'
                }
                : {
                  disabled: true,
                  type: 'button'
                },
                h('i.fa.fa-chevron-up')
               ),
              h('button.btn.btn-hover-primary',
                this.props.moveParagraphDown
                ? {
                  onClick: this.down,
                  type: 'button'
                }
                : {
                  disabled: true,
                  type: 'button'
                },
                h('i.fa.fa-chevron-down')
               ),
              h('button.btn.btn-hover-danger', {
                onClick: this.delete },
                h('i.fa.fa-trash')
               )
            ])
          ])
        ])
      ])
    )
  }
})

module.exports = Paragraph
