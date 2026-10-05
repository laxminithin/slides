import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import './App.css'
import './platform.css'
import './slideGeometry.css'
import './slideComposition.css'
import './slideLegibility.css'
import './bdaRedesign.css'
import './bdaComposition.css'
import './hadoopViz.css'
import './toc.css'
import './tocDeck.css'
import './tocRedesign.css'
import './tocComposition.css'
import './tocViz.css'
import './reworkDecks.css'
import './cn/cnAcademic.css'
import './insRedesign.css'
import './insViz.css'
import './insComposition.css'
import './cinematic/tokens.css'
import './cinematic/cinematic.css'
import './cinematic/living.css'
import './cinematic/debug.css'
import './internationalBusiness.css'
import './ibComposition.css'
import './ibChapter1.css'
import './ibChapter2.css'
import './ibChapter3.css'
import './ibChapter4.css'
import './ibChapter5.css'
import './dbms.css'
import './javaMasterpiece.css'
import './javaViz.css'
import './study.css'
import './universe.css'
import './rmIpr.css'
import './chemistry/chemistry.css'
import './deepLearning/deepLearning.css'
import './operatingSystems/os.css'
import './artificialIntelligence/ai.css'
import './analogElectronics/aelic.css'
import './dataStructures/ds.css'
import './softwareEngineering/se.css'
import './distributedSystems/dist.css'
import './unixSystemProgramming/unix.css'
import './computerGraphics/cg.css'
import './computerNetworksBcs502/cn502.css'
import './networkAnalysis/na.css'
import './pythonProgramming/py.css'
import './digitalCommunication/dc.css'
import './electricCircuitAnalysis/eca.css'
import './analogElectronicsCircuits/aec.css'
import './complexAnalysisTransforms/cat.css'
import './highVoltageEngineering/hve.css'
import './electricMotorDriveSystemsEv/emd.css'
import './materialsScienceMetallurgy/msm.css'
import './fluidMechanics/fm.css'
import './digitalSystemDesignUsingVerilog/dsd.css'
import './additionalMathematics1/am1.css'
import './kinematicsOfMachines/kom.css'
import './automationInManufacturing/aim.css'
import './analogElectronicsAndLinearIntegratedCircuits/aea.css'
import './lab/lab.css'
/* V3.1 composition layer loads after subject sheets so anti-top-heavy rules win
   equal-specificity contests. V3.2 sparse intelligence loads last and keys off
   data-content-density written by the runtime classifier. */
import './slideCompositionV31.css'
import './slideSparseV32.css'
import App from './App.jsx'
import PreviousYearQuestionsPage from './pages/PreviousYearQuestionsPage.jsx'
import PdfNotesViewer from './pages/PdfNotesViewer.jsx'
import DbmsResourcePage from './pages/DbmsResourcePage.jsx'
import BigDataResourcePage from './pages/BigDataResourcePage.jsx'
import TocResourcePage from './pages/TocResourcePage.jsx'
import ParallelComputingResourcePage from './pages/ParallelComputingResourcePage.jsx'
import ResearchMethodologyResourcePage from './pages/ResearchMethodologyResourcePage.jsx'
import ChemistryResourcePage from './pages/ChemistryResourcePage.jsx'
import DeepLearningResourcePage from './pages/DeepLearningResourcePage.jsx'
import OperatingSystemsResourcePage from './pages/OperatingSystemsResourcePage.jsx'
import ArtificialIntelligenceResourcePage from './pages/ArtificialIntelligenceResourcePage.jsx'
import NetworkAnalysisResourcePage from './pages/NetworkAnalysisResourcePage.jsx'
import PythonProgrammingResourcePage from './pages/PythonProgrammingResourcePage.jsx'
import DigitalCommunicationResourcePage from './pages/DigitalCommunicationResourcePage.jsx'
import FirstYearFoundationPlayground from './firstYearFoundation/Playground.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/big-data-analytics/module-1/previous-year-questions" element={<PreviousYearQuestionsPage />} />
        <Route path="/big-data-analytics/module-1/notes" element={<PdfNotesViewer />} />
        <Route path="/big-data-analytics/:moduleId/previous-year-questions" element={<BigDataResourcePage type="questions" />} />
        <Route path="/big-data-analytics/:moduleId/notes" element={<BigDataResourcePage type="notes" />} />
        <Route path="/database-management-systems/:moduleId/previous-year-questions" element={<DbmsResourcePage type="questions" />} />
        <Route path="/database-management-systems/:moduleId/notes" element={<DbmsResourcePage type="notes" />} />
        <Route path="/theory-of-computation/:moduleId/previous-year-questions" element={<TocResourcePage type="questions" />} />
        <Route path="/theory-of-computation/:moduleId/notes" element={<TocResourcePage type="notes" />} />
        <Route path="/parallel-computing/:moduleId/previous-year-questions" element={<ParallelComputingResourcePage type="questions" />} />
        <Route path="/parallel-computing/:moduleId/notes" element={<ParallelComputingResourcePage type="notes" />} />
        <Route path="/research-methodology-ipr/:moduleId/previous-year-questions" element={<ResearchMethodologyResourcePage type="questions" />} />
        <Route path="/research-methodology-ipr/:moduleId/notes" element={<ResearchMethodologyResourcePage type="notes" />} />
        <Route path="/chemistry/:moduleId/previous-year-questions" element={<ChemistryResourcePage type="questions" />} />
        <Route path="/chemistry/:moduleId/notes" element={<ChemistryResourcePage type="notes" />} />
        <Route path="/deep-learning/:moduleId/previous-year-questions" element={<DeepLearningResourcePage type="questions" />} />
        <Route path="/deep-learning/:moduleId/notes" element={<DeepLearningResourcePage type="notes" />} />
        <Route path="/deep-learning/:moduleId/lab" element={<DeepLearningResourcePage type="lab" />} />
        <Route path="/operating-systems/:moduleId/previous-year-questions" element={<OperatingSystemsResourcePage type="questions" />} />
        <Route path="/operating-systems/:moduleId/notes" element={<OperatingSystemsResourcePage type="notes" />} />
        <Route path="/artificial-intelligence/:moduleId/previous-year-questions" element={<ArtificialIntelligenceResourcePage type="questions" />} />
        <Route path="/artificial-intelligence/:moduleId/notes" element={<ArtificialIntelligenceResourcePage type="notes" />} />
        <Route path="/network-analysis/:moduleId/previous-year-questions" element={<NetworkAnalysisResourcePage type="questions" />} />
        <Route path="/network-analysis/:moduleId/notes" element={<NetworkAnalysisResourcePage type="notes" />} />
        <Route path="/network-analysis/:moduleId/quiz" element={<NetworkAnalysisResourcePage type="quiz" />} />
        <Route path="/network-analysis/:moduleId/assignment" element={<NetworkAnalysisResourcePage type="assignment" />} />
        <Route path="/python-programming/:moduleId/previous-year-questions" element={<PythonProgrammingResourcePage type="questions" />} />
        <Route path="/python-programming/:moduleId/notes" element={<PythonProgrammingResourcePage type="notes" />} />
        <Route path="/python-programming/:moduleId/quiz" element={<PythonProgrammingResourcePage type="quiz" />} />
        <Route path="/python-programming/:moduleId/assignment" element={<PythonProgrammingResourcePage type="assignment" />} />
        <Route path="/digital-communication/:moduleId/previous-year-questions" element={<DigitalCommunicationResourcePage type="questions" />} />
        <Route path="/digital-communication/:moduleId/notes" element={<DigitalCommunicationResourcePage type="notes" />} />
        <Route path="/digital-communication/:moduleId/quiz" element={<DigitalCommunicationResourcePage type="quiz" />} />
        <Route path="/digital-communication/:moduleId/assignment" element={<DigitalCommunicationResourcePage type="assignment" />} />
        <Route path="/__first-year-foundation" element={<FirstYearFoundationPlayground />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
