import React from 'react';
import {
  Document,
  Page,
  StyleSheet,
  Image,
  Text,
  View,
} from '@react-pdf/renderer';
import { AnswerType, ResultType } from '../../../shared/types';

type ResultPDFDocumentProps = {
  data: ResultType[];
};

/**
 * @type {ResultType} types.
 */

const styles = StyleSheet.create({
  page: {
    paddingTop: 10,
    paddingBottom: 35,
    paddingLeft: 35,
    paddingRight: 35,
  },
  title: {
    color: '#d33b54',
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
    marginTop: 5,
  },
  correct: {
    fontSize: 14,
    fontWeight: 600,
    marginHorizontal: 15,
    color: 'green',
  },
  incorrect: {
    fontSize: 14,
    fontWeight: 600,
    marginHorizontal: 15,
    color: 'red',
  },

  image: {
    width: 100,
    height: 100,
    marginHorizontal: 210,
  },
  noAnswers: {
    fontSize: 12,
    fontWeight: 400,
    color: '#A5A5A5',
    marginBottom: 10,
    marginLeft: 10,
  },
});

/**
 * @type {AnswerType} type.
 */

export const ResultPDFDocument: React.FC<ResultPDFDocumentProps> = ({
  data,
}) => {
  const { PUBLIC_URL } = process.env;
  const Logo = `${PUBLIC_URL}/new-logo.png`;

  return (
    <Document>
      <Page style={styles.page}>
        <Image src={Logo} style={styles.image} />
        <Text style={styles.title}>Resultados</Text>
        {data.map((x) => {
          const re = /\[.+?]/g;
          const message = x.question.split(re).join('___________');

          return (
            <View>
              <Text style={styles.question}>{`${x.order}.- ${message}`}</Text>
              <Text style={x.isCorrect ? styles.correct : styles.incorrect}>
                R: {x.response.label}
              </Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
