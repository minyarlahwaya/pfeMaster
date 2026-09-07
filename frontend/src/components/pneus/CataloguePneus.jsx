import { useEffect, useState } from "react";
import { getAllPneus } from "../../services/pneuApi";
import PneuCard from "./PneuCard";
import "./CataloguePneus.css";


function CataloguePneus() {


    const [pneus, setPneus] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    useEffect(() => {


        const loadPneus = async () => {


            try {


                const response = await getAllPneus();


                console.log(response.data);


                setPneus(response.data.pneus);



            } catch (error) {


                console.log(error);


                setError("Erreur lors du chargement des pneus");


            } finally {


                setLoading(false);


            }


        };


        loadPneus();


    }, []);





    if (loading) {

        return (

            <div className="loading">

                Chargement des pneus...

            </div>

        );

    }





    if (error) {

        return (

            <div className="error">

                {error}

            </div>

        );

    }





    return (


        <section className="catalogue-section">


            <div className="catalogue-header">


                <h1>

                    Catalogue Pneus

                </h1>


                <p>

                    Découvrez nos pneus automobiles adaptés à tous vos besoins.

                </p>


            </div>





            <div className="pneus-grid">


                {

                    pneus.map((pneu)=>(


                        <PneuCard

                            key={pneu.id}

                            pneu={pneu}

                        />


                    ))

                }


            </div>



        </section>


    );


}


export default CataloguePneus;