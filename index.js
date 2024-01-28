const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.listen(3000, () => {
    console.log("listening on port 3000");
})
// faking a data set
const comments = [
    {
        id: uuid(),
        username: 'harry',
        comment: 'heehehwhaw'
    },
    {
        id: uuid(),
        username: 'sherry',
        comment: 'hshehehwhaw'
    },
    {
        id: uuid(),
        username: 'barry',
        comment: 'hbahehwhaw'
    },
    {
        id: uuid(),
        username: 'LErry',
        comment: 'hLEhehwhaw'
    }
]

// new comment
app.get('/comments/new', (req, res) => {
    res.render('new.ejs');
})

//post comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    const id = uuid();
    comments.push({ id, username, comment });
    res.redirect("/comments");
})

//homepage
app.get('/comments', (req, res) => {
    res.render('index.ejs', { comments });
})

//show comment
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    res.render('show.ejs', { comment })
})

//update comment
app.get('/comments/:id/edit', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    res.render('update.ejs', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const id = req.params.id;
    const newCommentText = req.body.comment;
    comments.find(c => c.id === id).comment = newCommentText;
    res.redirect('/comments')
})

//delete comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments.pop(comments.find(c => c.id === id));
    res.redirect('/comments');
})