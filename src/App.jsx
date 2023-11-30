import ContextProvider from './ContextProvider';
import MainSection from './MainSection';

export default function App() {
    return (
        <ContextProvider>
            <MainSection></MainSection>
        </ContextProvider>
    )
}