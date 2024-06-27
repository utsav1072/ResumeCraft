import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
const CreativeResumeTemplate = ({ resumeData }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      padding: 30,
      lineHeight: 1.4,
      flexDirection: 'column',
    },
    header: {
      textAlign: 'center',
      marginBottom: 10,
      color: '#333',
      borderBottom: '1px solid #333',
      paddingBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    section: {
      marginBottom: 15,
    },
    heading: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#0d6efd',
    },
    paragraph: {
      marginBottom: 5,
      fontSize: 11,
      color: '#333',
    },
    highlight: {
      backgroundColor: '#f0f0f0',
      padding: 5,
      borderRadius: 3,
      marginBottom: 3,
      display: 'inline-block',
    },
  });

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
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
            <Text key={skill.name} style={styles.highlight}>{skill.name}</Text>
          ))}
        </View>
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
      </Page>
    </Document>
  );

  return <MyDocument />;
};

export default CreativeResumeTemplate;
