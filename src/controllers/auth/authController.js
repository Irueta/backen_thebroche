
import bcrypt from "bcrypt";
import usersModel from "../../models/usersModel.js";


const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await usersModel.findOne({where:{email:email}})
        console.log(user);
        if(!user){
            throw new Error("credenciales incorrectas");
        }
        const hash = user.password;

        if(await bcrypt.compare(password,hash)){
            req.session.user = user.id_usuario;
            req.session.rol = user.role;
        }
    }
    catch(e){
        const errorUri = encodeURIComponent("credenciales incorrectas");
        return res.redirect("/login?error="+errorUri);
    }
    
    res.redirect("/");
}



const loginForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("auth/login",{error:errorMessage});
}

const register = async(req,res) =>{
    const {email,password,passwordConfirm} = req.body;
    if(password !== passwordConfirm){
        const errorUri = encodeURIComponent("las contraseñas no coinciden")
        return res.redirect("/register?error="+errorUri);
    }
    try{
        const oldUser = await usersModel.findOne({
            where:{
                email:email
            }
        });
        if(oldUser){
            console.log("oldUser:",oldUser);
            const errorUri = encodeURIComponent("el usuario ya está registrado")
            return res.redirect("/register?error="+errorUri);
        }
        const hash = await bcrypt.hash(password,10);
        const newUser = usersModel.create({email:email,password:hash});
        req.session.user=newUser.email;
        req.session.rol=newUser.role;
        res.redirect("/login");
    }
    catch(e){
        const errorUri = encodeURIComponent(e.message);
        return res.redirect("/register?error="+errorUri);
    }
}

const registerForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("auth/register",{error:errorMessage});
}


const logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
}

export default{
    login,
    loginForm,
    logout,
    register,
    registerForm
}