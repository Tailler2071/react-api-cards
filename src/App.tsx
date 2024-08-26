import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import FullCard from "./pages/FullCard";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="card/:id" element={<FullCard/>}/>
        </Routes>
    );
};

export default App;
