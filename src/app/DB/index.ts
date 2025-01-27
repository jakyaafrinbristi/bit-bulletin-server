import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { User } from "../modules/user/user.model"



const superUser = {
    id:'0001',
    email:'bristyjakya@gmail.com',
    password:config.super_admin_password,
    needPasswordChange: false,
    role:USER_ROLE.superAdmin,
    status:'in-progress',
    isDeleted:false,
}

const seedSuperAdmin = async() =>{
    //when database is connected,we will check is there any user who is super admin

    const isSuperadminExists = await User.findOne({role:USER_ROLE.superAdmin});

    if(!isSuperadminExists){
        await User.create(superUser)
    }


}

export default seedSuperAdmin;