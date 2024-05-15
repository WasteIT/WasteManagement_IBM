function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 7602;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 7602 > /dev/null;
done;

for child in $(list_child_processes 7618);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/nusers/Documents/GitHub/WasteManagement_IBM/src/bin/Debug/net7.0/46e91e344cdb4c30a47c2f26a7ed6726.sh;
