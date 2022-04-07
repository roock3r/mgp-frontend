import React from "react";

import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import {Routes ,Route} from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Error from "./components/shared/error";
import Loading from "./components/shared/loading";
import DashboardHeader from "./components/dashboard/header";
import SectionOne from "./components/dashboard/subcomponents/sectionOne";
import SectionTwo from "./components/dashboard/subcomponents/sectionTwo";
import SectionThree from "./components/dashboard/subcomponents/sectionThree";
import SectionFour from "./components/dashboard/subcomponents/sectionFour";
import SectionFive from "./components/dashboard/subcomponents/sectionFive";
import SectionNine from "./components/dashboard/subcomponents/sectionNine";
import SectionSix from "./components/dashboard/subcomponents/sectionSix";
import SectionSeven from "./components/dashboard/subcomponents/sectionSeven";
import SectionEight from "./components/dashboard/subcomponents/sectionEight";
import SectionTen from "./components/dashboard/subcomponents/sectionTen";

export const UserContext = React.createContext()


const App = () => (
    <Query query={ME_QUERY} fetchPolicy='cache-and-network' >
        {
            ({ data, loading, error  }) => {
                if (loading) return <Loading/>
                if (error) return <Error error={error}/>
                const currentUser = data.me
                return(
                        <UserContext.Provider value={currentUser}>
                            <DashboardHeader currentUser={currentUser}>
                                <Routes>
                                    <Route path="/" element={<Dashboard/>} />
                                    <Route path="/section-1" element={<SectionOne/>} />
                                    <Route path="/section-2" element={<SectionTwo/>} />
                                    <Route path="/section-3" element={<SectionThree/>} />
                                    <Route path="/section-4" element={<SectionFour/>} />
                                    <Route path="/section-5" element={<SectionFive/>} />

                                    <Route path="/section-6" element={<SectionSix/>} />
                                    <Route path="/section-7" element={<SectionSeven/>} />
                                    <Route path="/section-8" element={<SectionEight/>} />
                                    <Route path="/section-9" element={<SectionNine/>} />
                                    <Route path="/section-10" element={<SectionTen/>} />
                                </Routes>
                            </DashboardHeader>
                        </UserContext.Provider>
                )
            }
        }
    </Query>
)

export const ME_QUERY = gql`
{
   me {
   id
   username
   email
   }
}
`

export default App;