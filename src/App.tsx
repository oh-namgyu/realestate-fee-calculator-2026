import { useFeeCalculator } from './hooks/useFeeCalculator';
import {
  Header,
  InputSection,
  ResultCard,
  AdSlot,
  SeoContent,
  Footer,
} from './components';

function App() {
  const {
    input,
    result,
    setPropertyType,
    setTransactionType,
    setSalePrice,
    setDeposit,
    setMonthlyRent,
    setVatType,
    reset,
  } = useFeeCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header onReset={reset} />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <InputSection
          input={input}
          onPropertyTypeChange={setPropertyType}
          onTransactionTypeChange={setTransactionType}
          onSalePriceChange={setSalePrice}
          onDepositChange={setDeposit}
          onMonthlyRentChange={setMonthlyRent}
          onVatTypeChange={setVatType}
        />

        {result && (
          <>
            <ResultCard result={result} input={input} />
            <AdSlot slot="result-bottom" format="auto" className="my-4" />
          </>
        )}

        <SeoContent />

        <AdSlot slot="page-bottom" format="horizontal" className="my-4" />
      </main>

      <Footer />
    </div>
  );
}

export default App;
