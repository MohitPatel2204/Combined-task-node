const displayTextData = (obj) => {
  let nodes = Object.keys(obj).map(item => document.getElementsByName(item)[0]);
  let keys = Object.keys(obj);
  nodes.forEach((node, count) => {
      switch (node.type) {
          case 'text':
          case 'number':
          case 'hidden':
              node.value = obj[keys[count]];
              break;
          case 'select-one':
          case 'select-multiple':
              let options = Object.values(node.options);
              let selected = [...obj[keys[count]]]
              if (node.type == 'select-one')
                  selected = [obj[keys[count]]]
              options.forEach(option => {
                  if (selected.indexOf(option.value) >= 0)
                      option.selected = true;
              })
              break;
      }
  })
}

const displayArrayData = (obj) => {
  let nodes = Object.keys(obj).map(item => document.getElementsByName(item));
  let keys = Object.keys(obj);

  nodes.forEach((node, count) => {
      let selected = typeof obj[keys[count]] == 'object' ? [...obj[keys[count]]] : [obj[keys[count]]];

      node.forEach((item, selectedCount) => {
          switch (item.type) {
              case 'radio':
              case 'checkbox':
                  if (selected.indexOf(item.value) >= 0)
                      item.checked = "true";
                  break;
              default:
                  item.value = selected[selectedCount];
          }
      })
  })
}


const display = () => {
  let candidate_id = window.location.href.split("/").pop();
  let url = `/job_app_ajax/candidate/${candidate_id}`;

  fetch(url).then(response => response.json()).then(candidate => {
      if (candidate.error) {
          window.location.href = "*";
          return;
      }
      
      const basic_details = candidate.basic_detail;
      const education = candidate.educations;
      let languages = candidate.languages;
      let technology = candidate.technologies;
      const work = candidate.work;
      const references = candidate.reference_contact;

      let obj1 = {
          candidate_id: basic_details.id,
          first_name: basic_details.first_name,
          last_name: basic_details.last_name,
          designation: basic_details.designation,
          email: basic_details.email,
          phone_no: basic_details.phone_no,
          relationship: basic_details.relationship,
          birthdate: basic_details.birthdate,
          state: basic_details.state,
          city: basic_details.city,
          expected_ctc: basic_details.expected_ctc,
          notice_period: basic_details.notice_period,
          current_ctc: basic_details.current_ctc,
          prefered_location: basic_details.prefered_location,
          department: basic_details.department,
      }
      displayTextData(obj1);
      

      obj1 = {
          gender: basic_details.gender ,
          address: basic_details.address,
      }

      languages = convertArrayData(languages, ['id', 'language', 'language_lvl']);
      let keys = Object.keys(languages);
      keys.forEach(key=>{
          obj1[key] = languages[key];
      })

      technology = convertArrayData(technology, ['id', 'technology', 'technology_lvl']);
      keys = Object.keys(technology);
      keys.forEach(key=>{
          obj1[key] = technology[key];
      })
      displayArrayData(obj1);

      obj1 = [
          {
              nodes: ["education_id", "course", "board", "passing_year", 'percentage'],
              data: education,
              genrateId: 'addeducation'
          },
          {
              nodes: ['work_id', 'company_name', 'work_designation', 'from_date', 'to_date'],
              data: work,
              genrateId: 'addwork'
          },
          {
              nodes: ['reference_id', 'name', 'contact', 'relation'],
              data: references,
              genrateId: 'addreference'
          },
      ]
      displayMdArrayData(obj1);
  })
}

const convertArrayData = (languages, key) => {
  let result = {};
  languages.forEach(language=>{
      let arr = [language[key[0]], language[key[1]]];
      language[key[2]].forEach(item=>{
          arr.push(item);
      })
      result[language[key[1]]] = arr; 
  })
  return result;
} 

const displayMdArrayData = (arr) => {
  arr.forEach(obj => {
      nodes = obj.nodes.map(node => document.getElementsByName(node))
      data = obj.data;
      for (let i = 0; i < data.length-1; i++) {
          add(obj.genrateId, data.length + 1);
      }

      for(let i=0; i<nodes[0].length; i++)
      {
          let keys = Object.keys(data[i]);
          keys.forEach((key, j)=>{
              switch (nodes[j][i].type) {
                  case 'select-one':
                  case 'select-multiple':
                      let selected = typeof data[i][key] == 'object' ? data[i][key] : [data[i][key]];
                      let options = Object.values(nodes[j][i].options);
                      options.forEach(option => {
                          if (selected.indexOf(option.value) >= 0)
                              option.selected = true;
                      })
                      break;
                  default:
                      nodes[j][i].value = data[i][key];
              }
          })
      }
  })
}

display();