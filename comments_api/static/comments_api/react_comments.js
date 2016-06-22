(function () {
    function getCookie(c_name)
    {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
    return "";
  }

$(function () {
    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
    });
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        data: {
            object_pk: this.props.subjectId,
            content_type: this.props.subjectType
        },
        success: function(data) {
            var commentCount = data.length;
            var commentString = this.getCommentString(commentCount);
            var newCommentsList = h(CommentList, {
                data: data
            });
            this.setState({
                commentList: newCommentsList,
                commentCount: commentCount,
                commentString: commentString
            });
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleCommentSubmit: function(comment) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
        success: function(new_comment) {
            var comments = this.state.commentList.props.data;
            var newComments = [new_comment].concat(comments);
            var newCommentcount = newComments.length;
            var newCommentString = this.getCommentString(newCommentcount);
            var newCommentsList = h(CommentList, {
                data: newComments
            });
            this.setState({
                commentList: newCommentsList,
                commentCount: newCommentcount,
                commentString: newCommentString});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getCommentString: function(count) {
        if(count===1){
            return this.props.translations.translations.comments_i18n_sgl;
        }
        else {
            return this.props.translations.translations.comments_i18n_pl;
        }
    },
    getInitialState: function() {
        return {
            commentCount: 0,
            commentString: this.props.translations.translations.comments_i18n_sgl,
            commentList: h(CommentList, {
                data: []
            })
        };
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    getChildContext: function() {
        return {
            isAuthenticated: this.props.isAuthenticated,
            login_url: this.props.login_url,
            comments_contenttype: this.props.comments_contenttype,
            submit_url: this.props.url,
            translations: this.props.translations,
            user_name: this.props.user_name
        };
    },
    render: function() {
        return (
            h('div.commentBox', [
                h('div.comments_count', this.state.commentCount + " " + this.state.commentString),
                h(CommentForm, { subjectType: this.props.subjectType,
                    subjectId: this.props.subjectId,
                    onCommentSubmit: this.handleCommentSubmit,
                    rows: 5
                }),
                this.state.commentList
            ])
        );
    }
});

CommentBox.childContextTypes = {
    isAuthenticated: React.PropTypes.number,
    login_url: React.PropTypes.string,
    comments_contenttype: React.PropTypes.number,
    submit_url: React.PropTypes.string,
    translations: React.PropTypes.object,
    user_name: React.PropTypes.string
};

var CommentList = React.createClass({
    render: function() {
        return (
            h('div', [
                this.props.data.map(function(comment) {
                    return (
                        h(Comment, {
                            key: comment.id,
                            user_name: comment.user_name,
                            child_comments: comment.child_comments,
                            submission_date: comment.submit_date,
                            id: comment.id,
                            content_type: comment.content_type,
                            },
                            comment.comment
                        )
                    );
                })
            ])
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function(text) {
        var rawMarkup = marked(text.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },

    getInitialState: function() {
        return {
            edit: false,
            showChildComments: false,
            comment_raw: this.props.children,
            comment: this.rawMarkup(this.props.children),
            child_comments: this.props.child_comments,
            commentCount: this.props.child_comments.length,
            editForm: h(CommentEditForm, {
                comment: this.props.children,
                rows: 5,
                handleCancel: this.toggleEdit,
                onCommentSubmit: this.handleCommentUpdate
            })
        };
    },

    toggleEdit: function(e) {
        if(e) {
            e.preventDefault();
        }
        var newEdit = !this.state.edit;
        this.setState({edit: newEdit});
    },

    showComments: function(e) {
        e.preventDefault();
        var newShowChildComment = !this.state.showChildComments;
        this.setState({showChildComments: newShowChildComment});
    },

    allowForm: function() {
        return !(this.props.content_type === this.context.comments_contenttype);
    },

    allowRate: function() {
        return true;
    },

    rateUp: function(e) {
        e.preventDefault();
        console.log('+1');
    },

    rateDown: function(e) {
        e.preventDefault();
        console.log('-1');
    },

    isOwner: function() {
        return this.props.user_name === this.context.user_name;
    },

    handleCommentSubmit: function(comment) {
        $.ajax({
            url: this.context.submit_url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(new_comment) {
                var comments = this.state.child_comments;
                var newComments = comments.concat([new_comment]);
                var newCount = newComments.length;
                this.setState({child_comments: newComments, commentCount: newCount});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.context.url, status, err.toString());
            }.bind(this)
        });
    },

    handleCommentUpdate: function(comment) {
        $.ajax({
            url: this.context.submit_url + this.props.id + '/',
            dataType: 'json',
            type: 'PATCH',
            data: comment,
            success: function(new_comment) {
                var updatedComment_raw = new_comment.comment;
                var updatedComment = this.rawMarkup(updatedComment_raw);
                var newForm = h(CommentEditForm, {
                    comment: updatedComment_raw,
                    rows: 5,
                    handleCancel: this.toggleEdit,
                    onCommentSubmit: this.handleCommentUpdate
                });
                this.setState({
                    comment: updatedComment,
                    comment_raw: updatedComment_raw,
                    editForm: newForm
                });
                this.toggleEdit();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.context.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function() {
        return (
            h('div.comment', [
                h('h3.commentAuthor', this.props.user_name),
                    this.state.edit ? this.state.editForm : h('span', {
                        dangerouslySetInnerHTML: this.state.comment
                    }
                ),
                h('ul.nav.nav-pills', [
                    h('li.entry', [
                        h('a.commentSubmissionDate.dark', this.props.submission_date)
                    ]),
                    this.allowForm() ? h('li.entry',[
                        h('a.icon.fa-comment-o.dark', {
                                href:'#',
                                onClick: this.showComments,
                                'aria-hidden': true
                            }, this.state.commentCount
                        )
                    ]) : null,
                    this.allowRate() ? h('li.entry',[
                        h('a.icon.fa-chevron-up.green', {
                                href:'#',
                                onClick: this.rateUp,
                                'aria-hidden': true
                            }, this.state.commentCount
                        )
                    ]) : null,
                    this.allowRate() ? h('li.entry',[
                        h('a.icon.fa-chevron-down.red', {
                                href:'#',
                                onClick: this.rateDown,
                                'aria-hidden': true
                            }, this.state.commentCount
                        )
                    ]) : null,
                    this.context.isAuthenticated ? h('li.dropdown', {role: 'presentation'},[
                        h('a.dropdown-toggle.icon.fa-ellipsis-h.dark', {
                            'data-toggle':'dropdown',
                            href:'#',
                            role:'button',
                            'aria-haspopup': true,
                            'aria-expanded': false,
                            'aria-hidden': true
                            }),
                        h('ul.dropdown-menu', [
                            this.isOwner() ? h('li', [
                                h('a.icon.fa-pencil.dark', {
                                        href:'#',
                                        onClick: this.toggleEdit,
                                        'aria-hidden': true
                                    }, this.context.translations.translations.i18n_edit
                                )
                            ]) : null,
                            h('li', [
                                h('a.icon.fa-ban.dark', {
                                        href:'#',
                                        onClick: this.rateUp,
                                        'aria-hidden': true
                                    }, this.context.translations.translations.i18n_report
                                )
                            ])
                        ])
                    ]) : null,
                ]),
                h('ul.nav.nav-pills.pull-right', [
                    this.allowForm() ? h('li.entry',[
                        h('a.icon.fa-reply', {
                                href:'#',
                                onClick: this.showComments,
                                'aria-hidden': true
                            }, this.context.translations.translations.i18n_answer
                        )
                    ]) : null
                ]),
                this.state.showChildComments ? h('div.child_comments_list', [
                    h(CommentList, { data: this.state.child_comments }),
                    h(CommentForm, { subjectType: this.context.comments_contenttype,
                        subjectId: this.props.id,
                        onCommentSubmit: this.handleCommentSubmit,
                        rows: 1
                    })
                ]) : null
            ])
        );
    }
});

Comment.contextTypes = {
    comments_contenttype: React.PropTypes.number,
    submit_url: React.PropTypes.string,
    isAuthenticated: React.PropTypes.number,
    user_name: React.PropTypes.string,
    translations: React.PropTypes.object
};

var CommentForm = React.createClass({
    getInitialState: function() {
        return {comment: ''};
    },
    handleTextChange: function(e) {
        this.setState({comment: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var comment = this.state.comment.trim();
        if (!comment) {
            return;
        }
        this.props.onCommentSubmit({
            comment: comment,
            object_pk: this.props.subjectId,
            content_type: this.props.subjectType});
            this.setState({comment: ''});
    },
    render: function() {
        if(this.context.isAuthenticated){
            return (
                h('form', { onSubmit: this.handleSubmit }, [
                    h('div.form-group', [
                    h('textarea.form-control', {
                        type: 'text',
                        placeholder: this.context.translations.translations.i18n_your_comment,
                        rows: this.props.rows,
                        value: this.state.comment,
                        onChange: this.handleTextChange,
                        required: 'required'
                    })
                ]),
                h('input.btn.btn-primary', {
                    type: 'submit',
                    value: this.context.translations.translations.i18n_post
                })
            ])
            );
        }
        else {
            return(
                h('div.comments_login', [
                    h('a', {href: this.context.login_url}, this.context.translations.translations.i18n_please_loggin_to_comment)
                ])
            );
        }
    }
});

CommentForm.contextTypes = {
    isAuthenticated: React.PropTypes.number,
    login_url: React.PropTypes.string,
    translations: React.PropTypes.object
};

var CommentEditForm = React.createClass({
    getInitialState: function() {
        return {comment: this.props.comment};
    },
    handleTextChange: function(e) {
        this.setState({comment: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var comment = this.state.comment.trim();
        if (!comment) {
            return;
        }
        this.props.onCommentSubmit({
            comment: comment
        });
    },
    render: function() {
        return (
            h('form', { onSubmit: this.handleSubmit }, [
                h('div.form-group', [
                h('textarea.form-control', {
                    type: 'text',
                    placeholder: this.context.translations.translations.i18n_your_comment,
                    rows: this.props.rows,
                    value: this.state.comment,
                    onChange: this.handleTextChange,
                    required: 'required'
                })
            ]),
            h('input.btn.btn-primary', {
                type: 'submit',
                value: this.context.translations.translations.i18n_post
            }),
            h('input.btn.btn-primary', {
                type: 'submit',
                value: this.context.translations.translations.i18n_cancel,
                onClick: this.props.handleCancel
            })
            ])
        );
    }
});

CommentEditForm.contextTypes = {
    isAuthenticated: React.PropTypes.number,
    login_url: React.PropTypes.string,
    translations: React.PropTypes.object
};

window._opin = window._opin || {}

window._opin.renderComment = function (url,subjectType, subjectId, comments_contenttype, isAuthenticated, login_url, target, translations, user_name) {
    ReactDOM.render(
      h(CommentBox, {
        url: url,
        subjectType: subjectType,
        subjectId: subjectId,
        comments_contenttype: comments_contenttype,
        isAuthenticated: isAuthenticated,
        login_url: login_url,
        pollInterval: 20000,
        translations: translations,
        user_name: user_name
      }),
      document.getElementById(target));
}
}());