import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const LeaveComment = () => {
  return (
    <View>
      <TextInput
        placeholder="Your Name"
        textAlign="left"
        style={styles.commentInput}
      />
      <TextInput
        placeholder="Your Comment"
        textAlign="left"
        multiline
        style={styles.commentMessageInput}
      />
      <View style={{marginLeft: 5, marginRight: 5}}>
        <TouchableOpacity>
          <Text style={styles.submitBtn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentInput: {
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
    borderColor: '#D9D9D9',
  },
  commentMessageInput: {
    marginTop: 0,
    height: 80,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
    borderColor: '#D9D9D9',
  },
  commentButton: {
    elevation: 8,
    backgroundColor: '#0e1296',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  submitBtn: {
    padding: 7,
    backgroundColor: '#183153',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    fontWeight: 'bold',
    borderColor: '#183153',
    marginBottom: 15,
    color: '#FFF',
  },
});

export default LeaveComment;
