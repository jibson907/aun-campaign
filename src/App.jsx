import { Routes, Route, Navigate } from 'react-router-dom';
import CampaignPage from './pages/CampaignPage.jsx';

export default function App() {
  return (
    <Routes>
      {/* Variant A — AUN logo only (default) */}
      <Route path="/" element={<CampaignPage variant="A" />} />
      <Route path="/variant-a" element={<CampaignPage variant="A" />} />

      {/* Variant B — Co-branded (AUN + Chohkman) */}
      <Route path="/variant-b" element={<CampaignPage variant="B" />} />

      {/* Convenience alias matching the billboard URL */}
      <Route
        path="/israel-dike-campaign"
        element={<CampaignPage variant="A" />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
