Cerebro Releases
------------

###v0.1.0 - July 14th, 2016

First cerebro release.

####Features
- cluster overview
- rest client
- aliases management
- index creation

###v0.2.0 - August 25th, 2016

#### New features
- analysis api
- index template api
- cluster settings api
- notify regarding created/deleted indices and joining/leaving nodes

###v0.3.0 - November 3rd, 2016

#### Bug fixes
- rest client format body button
- only display cluster changes if cluster name hasnt changed

#### Enhancements
- load default cluster settings values

#### New features
- added index settings module

###v0.3.1 - November 17th, 2016

#### Bug fixes
- displayed node roles

###v0.4.0 - December 2nd, 2016

#### Bug fixes
- fix favicon for
- handle cpu / load info from both 2.X and 5.X

#### Enhancements
- pagination buttons unselectable
- display relocating / initializing shards on overview

#### New features
- copy to curl to rest client
- repositories / snapshots module

###v0.4.1 - December 6th, 2016

#### Bug fixes
- fix indices selection on snapshot creation

###v0.4.2 - January 4th, 2017

#### Bug fixes
- fixed issue that prevent alias removal
- only display unassigned shard count when count is > 0

#### New features
- support shard relocation
- support edit index template
- added cat module

###v0.5.0 - January 19th, 2017

#### Bug fixes
- fixed stuck shard state

#### New features
- added authentication support

###v0.5.1 - February 11th, 2017

#### Enhancements
- consistent node sorting on cluster overview
- support host name on lists of known hosts

#### Bug fixes
- avoid parsing errors when ES requests fail
- fixes select shard for relocation menu entry

###v0.6.0 - March 9th, 2017

#### Enhancements
- support aws clusters
- order list of clusters alphabetically
- count primary and replicas on cluster overview
- use password input field

#### New features
- support rest client history
- nodes module

###v0.6.1 - March 10th, 2017

#### Bug fixes
- correct play.i18n.langs format
- set an application.home default

###v0.6.2 - March 21st, 2017

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

###v0.6.3 - March 22nd, 2017

#### Bug fixes
- fixed node stats danger indication in overview

#### Enhancements
- display all index aliases on overview
- improved error messages

###v0.6.4 - March 30th, 2017

#### Bug fixes
- use relative path for authentication action

#### Enhancements
- support indices with special characters (for ES < 2.X))

###v0.6.5 - April 6th, 2017

#### Bug fixes
- logout action to use relative path
- correctly handle an empty cat api response
- consider both string and text types on field analysis

#### Enhancements
- updated known node types(included ingest, renamed client to coordinating)
- support changing refresh interval

