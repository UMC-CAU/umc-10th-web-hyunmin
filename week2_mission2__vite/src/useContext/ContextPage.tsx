import {ThemeProvider} from './context/ThemeProvider.tsx';
import Navbar from './Navbar.tsx';
import ThemeContent from './ThemeContent.tsx';

export default function ContextPage() {
    return (
        <ThemeProvider> {/* Provider로 감싸야 하위에서 useTheme쓸 수 있음*/}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", width: "100%" }}>
                <Navbar />
                <main className='flex-1 w-full'>
                    <ThemeContent />
                </main>
            </div>
        </ThemeProvider>
    );
}