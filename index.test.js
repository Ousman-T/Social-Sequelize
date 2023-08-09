const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })

    // Write your tests here
    
    test("User and profile 1-1 association", async () => {
        const oneOnOneUser = await User.create({name: 'Amie', email:'amie@gmail.com'});
        const testProfile = await Profile.create({bio:'testProfile', profilePicture:'mic check', birthday:'1234'});
        await oneOnOneUser.setProfile(testProfile);
        const foundProfile = await oneOnOneUser.getProfile();
        expect(foundProfile instanceof User).toBeTruthy;

    }),
    test('User and post 1-many association', async () => {
        const unoUser = await User.create({name:'one-many', email:'1-many@gmail'});
        const manyPost = await Post.create({title:'manyPost', body:'manyPost'});
        await unoUser.setPosts(manyPost);
        const foundPosts = await unoUser.getPosts();
        expect(foundPosts instanceof User).toBeTruthy;
    }),
    test('Post and comment one to many association', async () => {
        const postComments = await Post.create({title:'many-many', body:'many-many'});
        const commentPost = await Comment.create({body:"many-many"});
        await postComments.setComments(commentPost);
        const gotComments = await postComments.getComments();
        expect(gotComments instanceof Comment).toBeTruthy;
    })




})