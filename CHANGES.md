Cerebro Releases
------------

### v0.1.0 - July 14th, 2016

First cerebro release.

#### Features
- cluster overview
- rest client
- aliases management
- index creation

### v0.2.0 - August 25th, 2016

#### New features
- analysis api
- index template api
- cluster settings api
- notify regarding created/deleted indices and joining/leaving nodes

### v0.3.0 - November 3rd, 2016

#### Bug fixes
- rest client format body button
- only display cluster changes if cluster name hasnt changed

#### Enhancements
- load default cluster settings values

#### New features
- added index settings module

### v0.3.1 - November 17th, 2016

#### Bug fixes
- displayed node roles

### v0.4.0 - December 2nd, 2016

#### Bug fixes
- fix favicon for
- handle cpu / load info from both 2.X and 5.X

#### Enhancements
- pagination buttons unselectable
- display relocating / initializing shards on overview

#### New features
- copy to curl to rest client
- repositories / snapshots module

### v0.4.1 - December 6th, 2016

#### Bug fixes
- fix indices selection on snapshot creation

### v0.4.2 - January 4th, 2017

#### Bug fixes
- fixed issue that prevent alias removal
- only display unassigned shard count when count is > 0

#### New features
- support shard relocation
- support edit index template
- added cat module

### v0.5.0 - January 19th, 2017

#### Bug fixes
- fixed stuck shard state

#### New features
- added authentication support

### v0.5.1 - February 11th, 2017

#### Enhancements
- consistent node sorting on cluster overview
- support host name on lists of known hosts

#### Bug fixes
- avoid parsing errors when ES requests fail
- fixes select shard for relocation menu entry

### v0.6.0 - March 9th, 2017

#### Enhancements
- support aws clusters
- order list of clusters alphabetically
- count primary and replicas on cluster overview
- use password input field

#### New features
- support rest client history
- nodes module

### v0.6.1 - March 10th, 2017

#### Bug fixes
- correct play.i18n.langs format
- set an application.home default

### v0.6.2 - March 21st, 2017

#### Bug fixes
- consider initializing/relocating/unassigned shards as unhealthy
- fixed showSpecialIndices toggle on snapshot
- recognise roles set with yes/no

#### Enhancements
- moved internal play settings from config file
- overview tooltips on node stats
- do not require user-domain on LDAP login
- shorter classpath for init script

#### New features
- support for custom base path
- added index stats action to overview

### v0.6.3 - March 22nd, 2017

#### Bug fixes
- fixed node stats danger indication in overview

#### Enhancements
- display all index aliases on overview
- improved error messages

### v0.6.4 - March 30th, 2017

#### Bug fixes
- use relative path for authentication action

#### Enhancements
- support indices with special characters (for ES < 2.X))

### v0.6.5 - April 6th, 2017

#### Bug fixes
- logout action to use relative path
- correctly handle an empty cat api response
- consider both string and text types on field analysis

#### Enhancements
- updated known node types(included ingest, renamed client to coordinating)
- support changing refresh interval

### v0.6.6 - July 26th, 2017

#### Bug fixes
- support non valid json requests through rest client
- consistent icon for coordinating nodes

#### Enhancements
- remove trailing / from ES hosts
- fix nodes tab to handle aws nodes
- order indices alphabetically on aliases page
- ensure unassigned shards ordering
- max width to alerts
- display single alias on overview
- improve performance of overview index filtering

### v0.6.7 - September 23rd, 2017

#### Bug fixes
- use correct host when copying rest request for curl
- fixed restore snapshot with multiple selected indices

#### Enhancements
- send content-type to ES
- hide closed indices by default on cluster overview
- display both source and target for relocating shards
- confirmation dialogs displayed over alert notifications

#### New features
- support flush index from cluster overview

### v0.6.8 - September 30th, 2017

#### Bug fixes
- fixed heading text on cat apis page
- fixed ordering for a few select components
- correctly display 0% disk usage
- fixed rendering of escaped content in rest client

#### Enhancements
- add missing settings for s3 repositories
- display alias filter/routing on aliases listing
- support linux aarch64 (https://github.com/lmenezes/cerebro/issues/207)

### v0.7.0 - October 13th, 2017

#### Bug fixes
- fixed rest url autocompletion
- fixed snapshot creation with selected list of indices
- fixes 'show onlly affected indices' filter

#### Enhancements
- overview section optimised for big clusters
- cluster changes alerts optimised for big clusters
- gzip enabled for all api calls
- avoid piling up of slow requests

### v0.7.1 - October 17th, 2017

#### Bug fixes
- fixes mass actions on selected indices
- fixes error connecting to cluster with more docs than Integer.MAX_VALUE

#### Enhancements
- enabled gzip when requesting data from ES
- optimised ES response parsing
- dropped internal usage of _cat apis in favor of faster alternatives

### v0.7.2 - November 28th, 2017

#### Bug fixes
- fixes unhealty indices filter
- analyse module to work with ES 6.X

### v0.7.3 - April 14th, 2018

#### New features
- allow saving cluster settings as persistent/transient

#### Bug fixes
- fix index and repo sorting in snapshot module #236
- fixes missing initializing shard when relocating shard #250
- fix restoring snapshots with dots on name #254
- ignore_unavailable indices for overview stats #247

### v0.8.0 - June 20th, 2018

#### New features
- cluster status text added to navbar and tab title
- available cluster/index settings now read from ES
- added dockerfile and published to dockerhub

### v0.8.1 - June 20th, 2018

#### Enhancements
- Fix markdown headers of CHANGES.md #240
- Add username formatting option to support OpenLDAP and others #246
- Simplify dockerfile #301

#### Bug Fixes
- Remove firefox specific rules incompatible with firefox Quantum #235

### v0.8.2 - April 2nd, 2019

#### Enhancements
- Move docker file to its [own repo](https://github.com/lmenezes/cerebro-docker) #306
- Add LDAP group search #307

### v0.8.3 - April 5th, 2019

#### Enhancements

- Sbt configuration for creating rpm and deb packages #308
- Fix markdown headers of CHANGES.md #328
- Fix snapshot view for snapshot that contains `:` #351
- Update scala and main libs to the latest versions #352
- Travis CI integration #353
- Stop logging sensible data #354

#### Bug fixes

- Show host in nodes overview #346

### v0.8.4 - July 23rd, 2019

#### Enhancements

- Support user-attr-template for LDAP auth
- Allow forwarding proxy headers to ES

### v0.8.5 - September 18th, 2019

#### Enhancements

- Update json-tree to 0.3.0 #405

#### Bug fixes

- Read closed indices from routing table
- Use full setting name for index settings updates #382
- Use openjdk8 instead of oraclejdk8 for travis testing
- Update json-tree to 0.3.0 #405

### v0.9.0 - April 24th, 2020

#### Enhancements

- GET as default verb in the REST console #437
- Upgrade to the latest Play and other core libraries #439
- Added possibility of configuring port using CEREBRO_PORT environment var. #438
- Allow selecting kind of shard allocation in overview #423
- Sort indices on snapshot restore (5317ddd54de574708dbf02e713b5e2d0865441e0). Closes #419
- Change login user input tooltip (66b73ddd5ab818534760bc64895899825a20ec62). Closes #424
- Add content-type to copied curl command (e93ab9948c3c650a9fcdd5be2a7edbe1976cab05). Closes #426
- Include aliases in rest autocompletion (abb8ab73992dfe9708b2b34f8ba2b75924d4d7ec)
- Drop support for deprecated endpoints.
- Drop type support on rest autocomplete. 

#### Bug fixes

- Tolerate missing settings for repositories (2bed3327b056295b215e6a809dcbf50e8b0e7926). Closes #409
- Handle post typeless indices mappings on analysis (9dbece339a014971307506977ec71045e977d576). Closes #412

### v0.9.1 - May 20th, 2020

#### Enhancements
- Display node attributes on overview / nodes view

### v0.9.2 - June 18th, 2020

#### Bug fixes
- Handle node info for nodes without defined attributes Closes #448

### v0.9.3 - December 27th, 2020

#### Improvements
- Support elasticsearch 7.10 data tiers

### v0.9.4 - April 10th, 2021

#### Security updates
- Bump socket.io to 2.4.1
