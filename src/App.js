import {CurrencyProvider} from "./context/CurrencyContext";
import CurrencyConverter from "./converter/CurrencyConverter";

const App = () => {
    return (
        <CurrencyProvider>
            <CurrencyConverter />
        </CurrencyProvider>
    );
};

export default App;





