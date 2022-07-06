import React from 'react'
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import PlanContextProvider from "./contexts/PlanContext";
import { Switch, Route } from 'react-router-dom'
import PlanDetails from './components/PlanDetails';

function App() {

    return (
        <div className='App'>

            <PlanContextProvider>

                <Navbar />

                <Switch>
                    <Route path='/plan/:id' exact component={PlanDetails} />
                    <Route path='/' exact component={Dashboard} />
                </Switch>

            </PlanContextProvider>

        </div>
    );
}

export default App;
