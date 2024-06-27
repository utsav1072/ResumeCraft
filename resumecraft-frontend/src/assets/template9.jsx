import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ResumeComponent = ({ resumeData }) => {
  // Define styles
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
      color: '#ffffff',
      backgroundColor: '#0d6efd',
      padding: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 14,
      color: '#ffffff',
    },
    main: {
      flexDirection: 'row',
      marginTop: 20,
    },
    sidebar: {
      width: '30%',
      paddingRight: 10,
    },
    content: {
      width: '70%',
      paddingLeft: 10,
    },
    section: {
      marginBottom: 15,
    },
    subheading: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#0d6efd',
    },
    paragraph: {
      marginBottom: 3,
      fontSize: 11,
      color: '#333',
    },
    listItem: {
      marginBottom: 2,
    },
    link: {
      color: '#0d6efd',
      textDecoration: 'underline',
      fontSize: 11,
    },
    bulletPoints: {
      paddingLeft: 10,
    },
    contactInfo: {
      marginBottom: 5,
      fontSize: 11,
      color: 'white',
    },
  });

  // Define the PDF document component
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.full_name}</Text>
          <Text key={resumeData.email_user} style={styles.contactInfo}>{resumeData.email_user}</Text>
          <Text style={styles.contactInfo}>{resumeData.contact_info}</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.sidebar}>
            <View style={styles.section}>
              <Text style={styles.subheading}>Links</Text>
              {resumeData.important_links.map(link => link.display && (
                <Text key={link.url} style={styles.link}>{link.link_name}</Text>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.subheading}>EDUCATION</Text>
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
              <Text style={styles.subheading}>SKILLS</Text>
              {resumeData.skills.map(skill => skill.display && (
                <Text key={skill.name} style={styles.paragraph}>{skill.name}</Text>
              ))}
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.subheading}>WORK EXPERIENCE</Text>
              {resumeData.projects.map(project => project.display && (
                <View key={project.name}>
                  <Text style={styles.paragraph}>{project.name}</Text>
                  <Text style={styles.paragraph}>{project.description}</Text>
                  <View style={styles.bulletPoints}>
                    {project.bullet_points.map((bullet, index) => bullet.display && (
                      <Text key={index} style={styles.listItem}>• {bullet.point}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
            {resumeData.custom_fields && resumeData.custom_fields.map(field => field.display && (
              <View key={field.heading} style={styles.section}>
                <Text style={styles.subheading}>{field.heading}</Text>
                <Text style={styles.paragraph}>{field.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (

      <MyDocument />
  );
};

export default ResumeComponent;
