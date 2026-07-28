// state.js
class CVState {
  constructor() {
    this.data = {
      name: '',
      title: '',
      email: '',
      phone: '',
      about: '',
      company: '',
      jobTitle: '',
      jobDesc: '',
      school: '',
      degree: '',
      skills: [],
      photo: null,
      language: 'ar',
      selectedTemplate: '1',
      themeColor: '#593BFE'
    };
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  updateData(key, value) {
    this.data[key] = value;
    this.notify();
  }

  notify() {
    this.listeners.forEach(listener => listener(this.data));
  }
}

const store = new CVState();