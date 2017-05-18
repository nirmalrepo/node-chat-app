/**
 * Created by nirmal on 5/16/17.
 */
[
    {
        id:'/#13fsfsdfswere',
        name:'Nirmal',
        room:'The Office Fans'
    }
]

// var users=[];
//
// var addUser=(id,name,room)=>{
//     users.push()
// };
//
// module.export={addUsers};

// class Person{
//     //constructor call by default
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//
//     }
//
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }
// //automatically fires
// var me=new Person('Nirmal',28);
// var description =me.getUserDescription();
// console.log(description);

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        //return user that was removed
        var user=this.getUser(id);
        if(user){
            this.users=this.users.filter((user)=>{
                return user.id!==id;
            });

            return user;
        }

    }
    getUser(id){
        var users=this.users.filter((user)=>{
            return user.id===id;
        });

        return users[0];

    }
    getUserList(room){
        var users=this.users.filter((user)=>{
            return user.room===room;
        });

        var namesArray=users.map((user)=>{
            return user.name;
        });

        return namesArray;
    }

}

module.exports = {Users};
