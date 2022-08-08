import React, { useEffect } from 'react';
import { BrowserRouter as Router, 
    Routes, 
    Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
// import { LoginScreen } from '../components/auth/LoginScreen';
// import { Home } from '../components/Home/Home';
// import { TareaScreen } from '../components/tarea/TareaScreen';
// import { ClientesScreen } from '../components/clientes/ClientesScreen';
// import { ProyectosScreen } from '../components/proyectos/ProyectosScreen';
// import { SistemasScreen } from '../components/sistemas/SistemasScreen';
// import { SubsistemasScreen } from '../components/subsistemas/SubsistemasScreen';
// import { GenerosScreen } from '../components/generos/GenerosScreen';
// import { ElementosScreen } from '../components/elementos/ElementosScreen';
import DashDefault from '../views/dashboard/DashDefault';
import Signin1 from '../views/auth/signin/SignIn1';
import FormsElements from '../views/forms/FormsElements';
import SamplePageMg from '../views/extra/SamplePageMg';



import AdminLayout from '../layouts/AdminLayout';
import BasicButton from '../views/ui-elements/basic/BasicButton';
import ElementosScreen from '../components/Elementos/ElementosScreen';
import PendientesScreen from '../components/Pendientes/PendientesScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    //console.log(checking);

    useEffect(() => {
        dispatch( startChecking( ) );

    }, [dispatch])


    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
                <Routes>
                     {/* <Route path="/login" element={<LoginScreen />} /> */}
                    <Route path="/login" element={
                        <PublicRoute isAuthenticated= { !!uid }>
                            <Signin1 />
                        </PublicRoute>
                    } 
                        
                    />

                    <Route path="/" element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <AdminLayout>
                                <DashDefault />
                            </AdminLayout>
                        </PrivateRoute>
                        } 
                    />

                    <Route path="/app/dashboard/default" element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <AdminLayout>
                                <DashDefault />
                            </AdminLayout>
                        </PrivateRoute>
                        } 
                    />

                    <Route path="/forms/form-basic" element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <AdminLayout>
                                <FormsElements />
                            </AdminLayout>
                        </PrivateRoute>
                        } 
                    />

                    <Route path="/sample-page" element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <AdminLayout>
                                <SamplePageMg />
                            </AdminLayout>
                        </PrivateRoute>
                        } 
                    />

                    <Route path="/elementos" element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <AdminLayout>
                                <ElementosScreen />
                            </AdminLayout>
                        </PrivateRoute>
                        } 
                    />

                    <Route path="/pendientes" element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <AdminLayout>
                                <PendientesScreen />
                            </AdminLayout>
                        </PrivateRoute>
                        } 
                    />

                    <Route path="/basic/button" element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <AdminLayout>
                                <BasicButton />
                            </AdminLayout>
                        </PrivateRoute>
                        } 
                    />


                    {/* <Navigate to="/" /> */}

                    <Route element={ 
                        <PrivateRoute isAuthenticated= { !!uid }>
                            <DashDefault />
                        </PrivateRoute>
                        } 
                    />


                </Routes>
            </div>
        </Router>
    )
}
