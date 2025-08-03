import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link , Font} from '@react-pdf/renderer';

// Register fonts
const GreenWhiteResumeTemplate = ({ resumeData }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      padding: 30,
      lineHeight: 1.4,
      flexDirection: 'row',
      backgroundColor: '#fff',
    },
    leftColumn: {
      width: '30%',
      paddingRight: 15,
      borderRight: '2px solid #28a745',
    },
    rightColumn: {
      width: '70%',
      paddingLeft: 15,
    },
    header: {
      marginBottom: 20,
      borderBottom: '2px solid #28a745',
      paddingBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#28a745',
    },
    section: {
      marginBottom: 15,
    },
    heading: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#28a745',
    },
    paragraph: {
      marginBottom: 5,
      fontSize: 11,
      color: '#333',
    },
    listItem: {
      marginBottom: 2,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.leftColumn}>
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.full_name}</Text>
            <Text style={styles.paragraph}>{resumeData.email_user}</Text>
            <Text style={styles.paragraph}>{resumeData.contact_info}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {resumeData.educations.map(edu => edu.display && (
              <View key={edu.school_name}>
                <Text style={styles.paragraph}>{edu.degree}</Text>
                <Text style={styles.paragraph}>{edu.school_name}</Text>
                <Text style={styles.paragraph}>{edu.address}</Text>
                <Text style={styles.paragraph}>{edu.start_date} - {edu.end_date}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            {resumeData.skills.map(skill => skill.display && (
              <Text key={skill.name} style={styles.paragraph}>{skill.name}</Text>
            ))}
          </View>
          <View style={styles.section}>
          {resumeData.important_links.filter(link => link.display).map((link, index) => (
              <Text key={index} style={styles.text}>
                <Link src={link.url} style={styles.link}>
                  {link.link_name}
                </Link>
                {index < resumeData.important_links.filter(link => link.display).length - 1 && ', '}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>
            {resumeData.projects.map(project => project.display && (
              <View key={project.name}>
                <Text style={styles.paragraph}>{project.name}</Text>
                <Text style={styles.paragraph}>{project.description}</Text>
                {project.bullet_points.map((bullet, index) => bullet.display && (
                  <Text key={index} style={styles.paragraph}>• {bullet.point}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return <MyDocument />;
};

export default GreenWhiteResumeTemplate;
