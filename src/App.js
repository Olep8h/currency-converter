import {CurrencyProvider} from "./CurrencyContext";
import CurrencyConverter from "./CurrencyConverter";

const App = () => {
    return (
        <CurrencyProvider>
            <CurrencyConverter />
        </CurrencyProvider>
    );
};

export default App;





