import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Projects from './routes/projects'
import ProjectByID from './routes/project_by_id';
import CreateProject from './routes/create_project';
import Forms from "./routes/forms"
import FormByID from './routes/form_by_id'
import CreateForm from './routes/create_form'
import EditForm from './routes/edit_form';
import Users from "./routes/users"
import CreateUser from './routes/create_user';
import Login from "./routes/login"
import Questions from "./routes/questions"
import MultipleChoice from './routes/multiple_choice'
import TextChoice from './routes/text_choice'
import CreateMultipleChoice from './routes/create_multiple_choice'
import EditMultipleChoice from './routes/edit_multiple_choice'
import CreateText from './routes/create_text'
import EditText from './routes/edit_text'
import SendProjects from './routes/send_projects'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route path="projects" element={<Projects />} />
        <Route path="projects/create" element={<CreateProject />} />
        <Route path="projects/auth" element={<Projects />} />
        <Route path="projects/send" element={<SendProjects />} />
        <Route path="projects/:projectID" element={<ProjectByID />} />
        <Route path="forms" element={<Forms />} />
        <Route path="/forms/:formID" element={<FormByID />} />
        <Route path="forms/create/:projectID" element={<CreateForm />} />
        <Route path="forms/edit/:formID" element={<EditForm />} />
        <Route path="users" element={<Users />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="questions" element={<Questions />} >
          <Route path="multiple-choice" element={<MultipleChoice />} />
          <Route path="text-choice" element={<TextChoice />} />
        </Route>
        <Route path="questions/multiple-choice/edit/:questionID" element={<EditMultipleChoice />} />
        <Route path="questions/multiple-choice/create/:formID" element={<CreateMultipleChoice />} />
        <Route path="questions/text/create/:formID" element={<CreateText />} />
        <Route path="questions/text/edit/:questionID" element={<EditText />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);