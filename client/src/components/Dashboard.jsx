import SimpleCard from './SimpleCard'
import React, { useContext } from 'react'
import { PlanContext } from '../contexts/PlanContext'
import AddPlanBtn from './AddPlanBtn'
import Icon from './Icon'
import { AuthContext } from '../contexts/AuthContext'
import PlanDetails from './PlanDetails'

export default function Dashboard() {


    const { state, } = useContext(PlanContext)
    const { authorised } = useContext(AuthContext).state
    const { plans } = state


    return (<>

        <div className='container-fluid' style={{
            minHeight: '90.5vh'
        }}>
            <div className="row">
                <div className="col-3" style={{
                    borderRight: "1px solid #ddd",
                    overflowY: "scroll",
                    height: "90.5vh"
                }}>
                    <div className='row '  >
                        <>
                            {
                                authorised ?
                                    plans.length > 0 ? plans.map(
                                        (plan, i) => <div className='col-12 p-0'
                                            key={plan._id}
                                            style={{
                                                height: "fit-content"
                                            }}
                                        >
                                            <SimpleCard
                                                sno={i + 1}
                                                plan={plan}
                                            />
                                        </div>
                                    ) :
                                        <div className='text-secondary m-auto mt-5' >

                                            <h4 className="text-secondary mb-3 text-center"> Create Your Plans! </h4>

                                            <div className='text-center'
                                                style={{ textAlign: "center", position: "absolute", top: "calc(50vh - 150px)", left: "calc(50vw - 100px)" }}>
                                                <Icon para={2} />
                                            </div>
                                            <div style={{ textAlign: "center", position: "absolute", top: "50vh", left: "calc(50vw - 35px)" }}>
                                                <AddPlanBtn variant={'outline-secondary'} />
                                            </div>


                                        </div> : <h4 className='text-secondary text-center mt-5'>You need to Login first</h4>
                            }
                        </>
                    </div>
                </div>
                <div className="col-9 p-0">
                    <PlanDetails />
                </div>
            </div>


        </div>

    </>
    )
}
