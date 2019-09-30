const header = $('header');

/* lodash templating (_.template) example */
//  template html
const headlineTemplate = `
    <div data-articleid="<%= id %>" class="breaking-content">
        <h5><%= title %></h5>
        <h6 class="source-name"><%= name %></h6>
        <span class="breaking__description text-muted"><%= desc %></span>
    </div>`;

// create a new template function iwith your html
const headlineFn = _.template(headlineTemplate);

// call the template function, passing it data. This returns compiled html
const compiledHtml = headlineFn({ id: 4, title: "example", name: 'zach', desc: "this is a description"});

header.append(compiledHtml);