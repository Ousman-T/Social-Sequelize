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
    
    test("User and profile 1-1 association", async function() {
        const user1 = await User.create({name:'Ousman', email:'ous@gmail.com'});
        const profile1 = await Profile.create({bio:'Software engineer', profilePicture:'Handsome', birthday:'04/19/2000'});
        await user1.setProfile(profile1);
        await profile1.setUser(user1);
        const userWithProfile = await User.findOne({where:{name:'Ousman'}, include: Profile});
        console.log(JSON.stringify(userWithProfile, null, 2));
        expect(userWithProfile.Profile).toBe(profile1);
        db.sync({force: true});
    }),
    test('User and post 1-many association', async () => {
        const user1 = await User.create({name:'Ousman', email:'ous@gmail.com'});
        const manyPosts = await Post.bulkCreate([{title:'What is for breakfast', body: 'egg and cheese', createdAt:'8/8/23'}, {title: 'What is for lunch', body:'turkey and cheese', createdAt:'8/8/23'}, {title:'What is for dinner', body:'chicken parm', createdAt: '8/8/23'}]);
        await user1.setPosts(manyPosts);
        const userWithManyPosts = await User.findOne({where:{name: 'Ousman'}, include: Post});
        expect(userWithManyPosts).toBe(manyPosts);
        db.sync({force:true});
    }),
    test('Post and comment one to many association', async () => {
        const post1 = await Post.create({title:'Working hybrid', body:'Commute two days', createdAt:'1:44PM'});
        const manyComments = await Comment.bulkCreate([{body:'How do you like it?', createdAt:'1:45PM'}, {body:'How is the commute', createdAt:'1:46PM'},{body:'Which do you prefer?', createdAt:'1:47PM'}]);
        const postWithManyComments = await Post.findOne({where:{title:'Working hybrid'}, include:Comment});
        console.log('----------------POSTS WITH COMMENTS-----------------------');
        console.log(postWithManyComments, null, 2);
        expect(postWithManyComments).toBe(manyComments);
    })




})