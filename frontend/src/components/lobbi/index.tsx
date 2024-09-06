import { Footer, Header } from "../wrap/wrap"
import style from "./style.module.css"
import { Link } from "react-router-dom"

const LobbiPage = () => {
    return(
        <>
            <Header />
            <main>
                <div className={style.box}>
                    <h1>Список лобби</h1><Link to = '/lobbi-create'><button>Create lobbi</button><br /></Link>
                    lfsdgsfd <br />
                    fsgkfdgl;sdf <br />
                    gsfdlgmsldkfgm;dfg <br />
                    f;sdgsfdl;gf;sdf <br />
                    slfdg;lsfdg;lsdf <br />
                    l;fsd;lgsdf';lg,sd <br />
                    l;sf;lgs;lfd,g
                </div>
            </main>
            <Footer />
        </>
    )
}

export default LobbiPage