import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonDefault } from '../../../shared/components/buttons/buttons';
import { ResultPDFDocument } from './ResultPDFDocument';
import { useUserProviderHook } from '../../../shared/components/user-provider/useUserProviderHook';
import { ResultType } from '../../../shared/types';
import { fetchLevelTestPDFResults } from '../result-actions';
import { levelTestPDFResultEvent } from '../result-events';

/**
 * @type {ResultType} type.
 */

const useStyles = makeStyles({
  buttons: {
    fontSize: 13,
    padding: '9px 17px',
  },
});

export const ResultPDFButton: React.FC = () => {
  const { currentUser, levelTest } = useUserProviderHook();
  const [results, setResults] = useState<ResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    if (levelTest?.id && currentUser && currentUser?.id) {
      fetchLevelTestPDFResults(levelTest?.id, currentUser?.id);
      setLoading(true);
    }
  }, [currentUser, levelTest]);

  useSubscription(levelTestPDFResultEvent, (state) => {
    if (state && state.results) {
      setResults(state.results);
      setLoading(false);
    }
  });

  return (
    <PDFDownloadLink
      style={{
        textDecoration: 'none',
      }}
      document={<ResultPDFDocument data={results} />}>
      <ButtonDefault
        variant="contained"
        color="primary"
        isLoading={loading}
        startIcon={<PictureAsPdfIcon />}
        className={classes.buttons}>
        DESCARGAR
      </ButtonDefault>
    </PDFDownloadLink>
  );
};
