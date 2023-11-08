

const create = async (req,res) => {
    const email = req.body.email;
    const idAdmin = req.session.user.id;
  console.log(req.body)
  console.log(req.session.user.id)
    if(!nombre){
        const errorUri = encodeURIComponent("Introduce un nombre valido");
        return res.redirect("/grupos/myGroups?error=" + errorUri);
    }const create = async (req,res) => {
        const nombre = req.body.nombre;
        const idAdmin = req.session.user.id;
      console.log(req.body)
      console.log(req.session.user.id)
        if(!nombre){
            const errorUri = encodeURIComponent("Introduce un nombre valido");
            return res.redirect("/grupos/myGroups?error=" + errorUri);
        }
      
        try{
            const oldGroup = await gruposModel.findOne({
                where:{
                    nombre:nombre
                }
            });
      
            if(oldGroup){
                console.log("oldGroup:",oldGroup);
                const errorUri = encodeURIComponent("El grupo ya existe");
                return res.redirect("/grupos/myGroups?error=" + errorUri);
            }
          
            const newGroup = await gruposModel.create({
                nombre:nombre,
                id_admin:idAdmin
            });
      
            res.redirect("/login");
        }
        catch(e){
            const errorUri= encodeURIComponent(e.message);
            return res.redirect("/grupos/myGroups?error=" + errorUri);
        }    
      }
      const createForm = (req,res) => {
        const errorMessage = req.query.error
        res.render("grupos/create",{error:errorMessage});
      }
  
    try{
        const oldGroup = await gruposModel.findOne({
            where:{
                nombre:nombre
            }
        });
  
        if(oldGroup){
            console.log("oldGroup:",oldGroup);
            const errorUri = encodeURIComponent("El grupo ya existe");
            return res.redirect("/grupos/myGroups?error=" + errorUri);
        }
      
        const newGroup = await gruposModel.create({
            nombre:nombre,
            id_admin:idAdmin
        });
  
        res.redirect("/login");
    }
    catch(e){
        const errorUri= encodeURIComponent(e.message);
        return res.redirect("/grupos/myGroups?error=" + errorUri);
    }    
  }
  const createForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("grupos/create",{error:errorMessage});
  }