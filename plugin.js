{
    "id": "nodebb-plugin-cashstore",
    "name": "NodeBB Cash Store",
    "description": "NodeBB Cash Item store",
    "url": "https://github.com/peterhughesdev/nodebb-plugin-cashstore",
    "library": "./main.js",
    "hooks": [
       {
           "hook": "static:app.load", "method": "init"
       },
       {
           "hook": "filter:admin.header.build", "method": "addAdminNavigation"
       },
       {
           "hook": "filter:posts.custom_profile_info", "method": "addProfileInfo"
       },
       {
           "hook": "action:item.buy", "method": "buyItem"
       }
    ],
    "templates": "./static/templates",
    "staticDirs": {
        "static": "./static"
    },
    "css": [
        "./static/style.css"
    ]
}
