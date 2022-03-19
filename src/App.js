import Main from "./components/frontend/main";
// import Wrapper from "./components/wrapper";
// import Blocker from "./components/frontend/common/blocker";
//
// function App() {
//   return (
//       <Wrapper>
//         {/*<Main/>*/}
//           <Blocker/>
//       </Wrapper>
//   );
// }
//
// export default App;

import React from "react";

import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import {Routes ,Route} from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Error from "./components/shared/error";
import Loading from "./components/shared/loading";
import DashboardHeader from "./components/dashboard/header";
import SectionOne from "./components/dashboard/subcomponents/sectionOne";

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