import { Calendar } from "./components/Calender";
function App() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Responsive Calendar</h1>
        <Calendar />
      </main>
    </>
  );
}

export default App;
