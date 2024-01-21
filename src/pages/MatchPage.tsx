import { Layout } from "../components/common/layout/Layout";
import { MatchTemplate } from "../components/template/MatchTemplate";
import { useMatch } from "../hooks/useMatch";

export const MatchPage = () => {
  const { matchListValue, handleMatchCancle, handlepostMatch } = useMatch();
  return (
    <Layout title={"강아지 매칭"} showHeader={true} showFooter={true}>
      <MatchTemplate
        matchListValue={matchListValue}
        handleMatchCancle={handleMatchCancle}
        handlepostMatch={handlepostMatch}
      />
    </Layout>
  );
};